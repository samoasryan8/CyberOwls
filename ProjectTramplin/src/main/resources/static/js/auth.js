// auth.js - Ավտորիզացիայի և դերերի կառավարման լոգիկա (Mock)

function login(email, name, role) {
    const user = { 
        email: email, 
        role: role, 
        name: name 
    };
    localStorage.setItem('tramplin_user', JSON.stringify(user));
    window.location.href = getDashboardUrl(role);
}

// Ստուգում է արդյոք օգտատերը մուտք է գործել
function checkAuth(requireAuth = false) {
    const user = JSON.parse(localStorage.getItem('tramplin_user'));
    
    // Եթե էջը պահանջում է մուտք, բայց օգտատերը չկա, գնում ենք login
    if (requireAuth && !user) {
        window.location.href = 'login.html';
    }
    return user;
}

// Ելք համակարգից
function logout() {
    localStorage.removeItem('tramplin_user');
    window.location.href = 'login.html';
}

// Վերադարձնում է ճիշտ կաբինետի հղումը ըստ դերի
function getDashboardUrl(role) {
    switch(role) {
        case 'APPLICANT': return 'dashboard-applicant.html';
        case 'EMPLOYER': return 'dashboard-employer.html';
        case 'CURATOR': return 'dashboard-curator.html';
        case 'ADMIN': return 'dashboard-curator.html'; // Ադմինը և կուրատորը նման են
        default: return 'index.html';
    }
}

// Թարմացնում է նավիգացիան բոլոր էջերում
function updateNavbar() {
    const user = checkAuth();
    const navAuth = document.getElementById('navAuth');
    
    if (navAuth && user) {
        navAuth.innerHTML = `
            <a href="index.html" class="text-sm font-medium text-gray-600 hover:text-blue-600">Աշխատանքներ</a>
            <a href="${getDashboardUrl(user.role)}" class="text-sm font-medium text-blue-600 hover:text-blue-800">Իմ Կաբինետը (${user.role})</a>
            <button onclick="logout()" class="bg-red-50 text-red-600 hover:bg-red-100 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                Ելք
            </button>
        `;
    }
}
