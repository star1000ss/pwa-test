import { useState } from "react"
import { supabase } from "@/lib/supabase" // 確保您的 supabase client 路徑正確
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // 新增詳細資料欄位狀態
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // 步驟 A：在 Auth 表建立帳號
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      setMessage(`註冊錯誤: ${authError.message}`)
      setLoading(false)
      return
    }

    const user = authData.user

    if (user) {
      // 步驟 B：將詳細資料寫入您的自訂資料表 (例如名為 'profiles')
      const { error: profileError } = await supabase
        .from('user_profiles') 
        .insert([
          { 
            id: user.id,      // 使用 Auth 回傳的 ID 作為關聯
            full_name: fullName
          }
        ])

      if (profileError) 
        setMessage(`儲存錯誤: ${profileError.message}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>建立學員帳號</CardTitle>
          <CardDescription>請填寫以下資訊完成註冊</CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {/* 詳細資料欄位 */}
            <div className="space-y-2">
              <Label htmlFor="fullName">真實姓名</Label>
              <Input id="fullName" value={fullName} onChange={(e)=>setFullName(e.target.value)} required />
            </div>
                        

            <Separator className="my-4" />

            {/* 帳號密碼欄位 */}
            <div className="space-y-2">
              <Label htmlFor="email">學員帳號</Label>
              <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">設定密碼</Label>
              <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            
            {message && <p className="text-sm text-blue-600 font-medium">{message}</p>}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "處理中..." : "確認註冊"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}