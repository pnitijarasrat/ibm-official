export const departmentOptions = [
    { label: 'Marketing', value: 'marketing' },
    { label: 'Technology', value: 'technology' },
    { label: 'Operation', value: 'operation' },
    { label: 'Finance', value: 'finance' },
    { label: 'Human Resource', value: 'hr' },
    { label: 'Executive', value: 'executive' },
    { label: 'Area', value: 'area' },
]

export const getDisplayDepartment = (department) => {
    switch (department) {
        case "marketing": return "Marketing"
        case "technology": return "Technology"
        case "operation": return "Operation"
        case "finance": return "Finance"
        case "hr": return "Human Resource"
        case "executive": return "Executive"
        case "area": return "Area"
    }
}