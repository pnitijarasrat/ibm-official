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

export const getDisplayRegion = (branch) => {
  if (["5", "6", "05", "06", "07", "7", "11", "29"].includes(branch)) return "Center";
  if (["2", "9", "02", "09", "13", "18", "19"].includes(branch)) return "East";
  if (["4", "8", "04", "08", "10", "20", "25"].includes(branch)) return "North";
  if (["1", "01", "22", "28", "30"].includes(branch)) return "North East";
  if (["12", "17", "21", "26", "27"].includes(branch)) return "South";
  if (["15", "23", "14", "16", "3", "03"].includes(branch)) return "West";

  // Handle cases when branch doesn't match any predefined regions
  return "Unknown";
};
