// Initialize Lucide icons
lucide.createIcons();

// Ստուգում ենք ավտորիզացիան (պարտադիր է գլխավոր էջի համար)
checkAuth(true);
updateNavbar();

// --- 1. Տվյալների բազա (Mock Data) ---
const mockJobs = [
    {
        id: 1,
        companyName: 'TechSys Armenia',
        title: 'Junior Spring Boot Developer',
        description: 'Փնտրում ենք սկսնակ Java/Spring Boot ծրագրավորող մեր թիմին միանալու համար:',
        salaryMin: 200000,
        salaryMax: 400000,
        format: 'OFFICE',
        lat: 40.1922,
        lng: 44.5136,
        tags: ['Java', 'Spring Boot', 'SQL']
    },
    {
        id: 2,
        companyName: 'GlobalWeb',
        title: 'React Frontend Intern',
        description: '3-ամսյա վճարովի ստաժավորում React և ժամանակակից վեբ տեխնոլոգիաներով:',
        salaryMin: 100000,
        salaryMax: 150000,
        format: 'HYBRID',
        lat: 40.1812,
        lng: 44.5142,
        tags: ['React', 'JavaScript', 'CSS']
    },
    {
        id: 3,
        companyName: 'DataFlow LLC',
        title: 'Data Analyst (Python/SQL)',
        description: 'Տվյալների վերլուծաբան մեծ ծավալի տվյալների հետ աշխատելու համար:',
        salaryMin: 300000,
        salaryMax: 600000,
        format: 'REMOTE',
        lat: 40.2052,
        lng: 44.5012,
        tags: ['Python', 'SQL', 'Data Science']
    },
    {
        id: 4,
        companyName: 'ArmSoft',
        title: 'Senior Java Developer',
        description: 'Ավագ ծրագրավորող բարդ միկրոսերվիսային ճարտարապետության համար:',
        salaryMin: 800000,
        salaryMax: 1500000,
        format: 'REMOTE',
        lat: 40.1752,
        lng: 44.5112,
        tags: ['Java', 'Microservices', 'Docker']
    }
];

let favorites = JSON.parse(localStorage.getItem('tramplin_favorites')) || [];

function toggleFavorite(jobId, event) {
    if (event) event.stopPropagation();
    if (favorites.includes(jobId)) {
        favorites = favorites.filter(id => id !== jobId);
    } else {
        favorites.push(jobId);
    }
    localStorage.setItem('tramplin_favorites', JSON.stringify(favorites));
    renderJobs();
    renderMarkers();
}

// --- Քարտեզի սկզբնականացում ---
const map = L.map('map', { zoomControl: false }).setView([40.1872, 44.5152], 13);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markersLayer = L.layerGroup().addTo(map);
let activeJobId = null;

function createCustomIcon(isFavorite, isActive) {
    const color = isFavorite ? '#ef4444' : '#3b82f6';
    const scale = isActive ? 'scale(1.3)' : 'scale(1)';
    const zIndex = isActive ? 1000 : 1;
    return L.divIcon({
        className: 'custom-leaflet-icon',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.4); transform: ${scale}; z-index: ${zIndex};"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
}

// Ֆիլտրացիայի տրամաբանություն
function getFilteredJobs() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const formatQuery = document.getElementById('formatFilter').value;
    const salaryMin = parseInt(document.getElementById('salaryMin').value) || 0;
    
    const skillsText = document.getElementById('skillsFilter').value.toLowerCase();
    const skillsArray = skillsText.split(',').map(s => s.trim()).filter(s => s.length > 0);

    return mockJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery) || job.companyName.toLowerCase().includes(searchQuery);
        const matchesFormat = formatQuery === '' || job.format === formatQuery;
        const matchesSalary = job.salaryMax >= salaryMin;
        
        // Եթե հմտություններ գրված են, ստուգում ենք արդյոք աշխատանքի թեգերից գոնե մեկը համընկնում է
        const matchesSkills = skillsArray.length === 0 || skillsArray.some(skill => 
            job.tags.some(tag => tag.toLowerCase().includes(skill))
        );

        return matchesSearch && matchesFormat && matchesSalary && matchesSkills;
    });
}

function renderJobs() {
    const jobListEl = document.getElementById('jobList');
    const filteredJobs = getFilteredJobs();

    jobListEl.innerHTML = '';

    if (filteredJobs.length === 0) {
        jobListEl.innerHTML = '<div class="text-center py-10 text-gray-500">Ոչինչ չի գտնվել: Փոխեք ֆիլտրերը:</div>';
        return;
    }

    filteredJobs.forEach(job => {
        const isFav = favorites.includes(job.id);
        const isActive = activeJobId === job.id;
        const tagsHtml = job.tags.map(tag => `<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">${tag}</span>`).join('');
        
        const card = document.createElement('div');
        card.className = `bg-white p-5 rounded-xl border transition-all cursor-pointer hover:shadow-md ${isActive ? 'border-blue-500 shadow-md ring-1 ring-blue-500' : 'border-gray-200'}`;
        card.onclick = () => selectJob(job.id, job.lat, job.lng);
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="font-semibold text-lg text-gray-900 leading-tight">${job.title}</h3>
                    <div class="text-sm text-gray-600 mt-1">${job.companyName}</div>
                </div>
                <button onclick="toggleFavorite(${job.id}, event)" class="text-gray-400 hover:text-red-500 p-1">
                    <i data-lucide="${isFav ? 'bookmark-check' : 'bookmark'}" class="${isFav ? 'text-red-500' : ''} w-6 h-6"></i>
                </button>
            </div>
            <div class="flex gap-2 mb-4">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">${job.format}</span>
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium">${job.salaryMin/1000}k - ${job.salaryMax/1000}k AMD</span>
            </div>
            <p class="text-sm text-gray-600 line-clamp-2 mb-4">${job.description}</p>
            <div class="flex flex-wrap gap-1.5">${tagsHtml}</div>
        `;
        jobListEl.appendChild(card);
    });
    lucide.createIcons();
}

function renderMarkers() {
    markersLayer.clearLayers();
    const filteredJobs = getFilteredJobs();

    filteredJobs.forEach(job => {
        const isFav = favorites.includes(job.id);
        const isActive = activeJobId === job.id;
        
        const marker = L.marker([job.lat, job.lng], {
            icon: createCustomIcon(isFav, isActive)
        }).addTo(markersLayer);
        
        marker.on('click', () => selectJob(job.id, job.lat, job.lng));
        
        marker.bindPopup(`
            <div class="p-1 min-w-[200px]">
                <h4 class="font-bold text-sm m-0 mb-1">${job.title}</h4>
                <div class="text-xs text-gray-600 mb-2">${job.companyName}</div>
                <div class="text-xs font-medium text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded">${job.format}</div>
            </div>
        `, { className: 'custom-popup', closeButton: false });
    });
}

function selectJob(id, lat, lng) {
    activeJobId = id;
    map.flyTo([lat, lng], 15, { duration: 0.5 });
    renderJobs();
    renderMarkers();
}

// Լսում ենք ֆիլտրերի փոփոխությունները
['searchInput', 'formatFilter', 'salaryMin', 'skillsFilter'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        renderJobs();
        renderMarkers();
    });
});

renderJobs();
renderMarkers();

