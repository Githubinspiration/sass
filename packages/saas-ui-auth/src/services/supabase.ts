import {
  AuthParams,
  AuthOptions,
  User,
  AuthStateChangeCallback,
  AuthProviderProps,
} from '../'

export const createAuthService = (supabase: any): AuthProviderProps => {
  const onLogin = async (params: AuthParams, options?: AuthOptions) => {
    const { user, error } = await supabase.auth.signIn(
      params as unknown,
      options
    )

    if (user) {
      return user as User
    } else if (error) {
      throw error
    }
  }

  const onSignup = async (params: AuthParams, options?: AuthOptions) => {
    const { email, password, ...data } = params
    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data,
        ...options,
      }
    )

    if (user) {
      return user as User
    } else if (error) {
      throw error
    }
  }

  const onVerify = async (params: AuthParams) => {
    const { session, error } = await supabase.auth.verifyOTP(params)

    if (session) {
      return !!session
    } else if (error) {
      throw error
    }
  }

  const onLogout = async () => {
    return await supabase.auth.signOut()
  }

  const onAuthStateChange = (callback: AuthStateChangeCallback) => {
    const { data } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        callback(session?.user as User)
      }
    )

    return () => data?.unsubscribe()
  }

  const onLoadUser = async () => {
    return supabase.auth.user()
  }

  const onCheckAuth = async () => {
    return !!supabase.auth.session()
  }

  return {
    onLogin,
    onSignup,
    onVerify,
    onLogout,
    onAuthStateChange,
    onLoadUser,
    onCheckAuth,
  }
}
