export function parseCSV(csvText: string): Array<Record<string, string>> {
  const lines = csvText.trim().split("\n")
  if (lines.length < 2) return []

  const headers = lines[0].split(",").map((header) => header.trim())
  const data: Array<Record<string, string>> = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((value) => value.trim())
    if (values.length === headers.length) {
      const row: Record<string, string> = {}
      headers.forEach((header, index) => {
        row[header] = values[index]
      })
      data.push(row)
    }
  }

  return data
}

export function validateCSVStructure(data: Array<Record<string, string>>): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (data.length === 0) {
    errors.push("CSV data is empty")
    return { isValid: false, errors }
  }

  const headers = Object.keys(data[0])
  if (headers.length === 0) {
    errors.push("No headers found in CSV")
    return { isValid: false, errors }
  }

  // Check for consistent column count
  for (let i = 0; i < data.length; i++) {
    const rowHeaders = Object.keys(data[i])
    if (rowHeaders.length !== headers.length) {
      errors.push(`Row ${i + 1} has inconsistent column count`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
