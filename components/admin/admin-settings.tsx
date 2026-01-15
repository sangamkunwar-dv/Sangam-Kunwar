"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

interface AdminSettingsProps {
  userEmail: string
}

export default function AdminSettings({ userEmail }: AdminSettingsProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return setError("Please fill in all password fields")
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match")
    }

    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters")
    }

    setLoading(true)

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setMessageType("success")
      setMessage("Password updated successfully")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const setError = (msg: string) => {
    setMessageType("error")
    setMessage(msg)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Admin Account</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            disabled
            value={userEmail}
            className="w-full px-4 py-2 border rounded bg-muted"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />

          {message && (
            <div className={`p-3 rounded text-sm ${
              messageType === "success"
                ? "bg-green-500/10 text-green-600"
                : "bg-red-500/10 text-red-600"
            }`}>
              {message}
            </div>
          )}

          <button
            disabled={loading}
            onClick={handleChangePassword}
            className="w-full bg-primary text-white py-2 rounded"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
