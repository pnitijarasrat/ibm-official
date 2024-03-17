export const isAdmin = (role) => (["admin", "superAdmin"].includes(role))

export const getDisplayRole = (role) => {
    switch (role) {
        case 'admin': return "Admin"
        case 'superAdmin': return "Super Admin"
        case 'areaManager': return "Area Manager"
        case 'manager': return "Manager"
        case 'assistManager': return "Assist Manager"
        case 'operator': return "Operator"
    }
}