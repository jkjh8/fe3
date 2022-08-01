import { ref, computed } from 'vue'
import { api } from '../useAxios'

const user = ref(null)

const nickName = computed(() => {
  if (user.value && user.value.name) {
    return user.value.name.substring(0, 1)
  } else {
    return 'No'
  }
})

async function logout() {
  try {
    await api.get('/auth/logout')
    user.value = null
  } catch (err) {
    console.error(err)
  }
}

export { user, nickName, logout }
