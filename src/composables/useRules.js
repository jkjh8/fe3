import { api } from 'src/composables/useAxios'

export const required = (v) => !!v || '필수 입력 항목 입니다.'
export const checkTypeEmail = (v) =>
  /.+@.+\..+/.test(v) || '이메일 형식이 아닙니다.'
export const minLength = (v) => v.length >= 8 || '최소 8자 이상 입력하세요.'
export const checkEmailUsed = async (v) => {
  const r = await api.get(`/auth/checkEmailUsed?email=${v}`)
  if (r && r.data) {
    return '이미 사용중인 이메일 입니다.'
  }
  return true
}
