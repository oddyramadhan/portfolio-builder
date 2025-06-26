import { FormSchema } from "@/schema/form.schema"

export const saveSettings = async (data: FormSchema) => {
  const res = await fetch("http://localhost:3002/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Failed to save settings")

  return await res.json()
}

export const getLatestSettings = async () => {
  const res = await fetch("http://localhost:3002/settings")
  if (!res.ok) throw new Error("Failed to fetch settings")
  const data = await res.json()
  return data[data.length - 1]
}

export const updateSettings = async (id: string, data: FormSchema) => {
  const res = await fetch(`http://localhost:3002/settings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Failed to update settings")
  return await res.json()
}