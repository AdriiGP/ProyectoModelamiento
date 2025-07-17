import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Nueva Contraseña</h2>
          <p className="mt-2 text-sm text-gray-600">Ingresa tu nueva contraseña</p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
