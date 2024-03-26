export const isAdmin = (role) => (["admin", "superAdmin"].includes(role))
export const isManager = (role) => (["admin", "superAdmin", "areaManager", "areaAssistManager", "manager"].includes(role))

// Not Finish
// export const roleOption = [
//     { label: 'Super Admin', value: 'superAdmin' },
//     { label: 'Admin', value: 'admin' },
//     { label: 'Area Manager', value: 'areaManager' },
//     { label: 'Area Assist Manager', value: 'areaAssistManager' },
//     { label: 'Manager', value: 'manager' },
//     { label: 'Assist Manager', value: 'areaManager' },
//     { label: 'Area Manager', value: 'areaManager' },
//     { label: 'Area Manager', value: 'areaManager' },
// ]
export const roleOption = [
  { label: 'Management Trainee', value: 'managementTrainee' },
  { label: 'Area Manager', value: 'areaManager' },
  { label: 'Area Assist Manager', value: 'areaAssistManager' },
  { label: 'Manager', value: 'manager' },
  { label: 'Assist Manager', value: 'assistManager' },
  { label: 'Operator', value: 'operator' },
]

export const getDisplayRole = (role) => {
  switch (role) {
    case 'admin': return "Admin"
    case 'superAdmin': return "Super Admin"
    case 'areaManager': return "Area Manager"
    case 'areaAssistManager': return "Area Assist Manager"
    case 'manager': return "Manager"
    case 'assistManager': return "Assist Manager"
    case 'operator': return "Operator"
    case 'managementTrainee': return "Management Trainee"
    default: return 'Please Report CTO'
  }
}
