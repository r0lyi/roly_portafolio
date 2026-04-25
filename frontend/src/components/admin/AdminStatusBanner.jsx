import { adminStatusClass } from '../../styles/tailwindClasses.js'

function AdminStatusBanner({ type = 'info', message }) {
  if (!message) {
    return null
  }

  return <p className={adminStatusClass(type)}>{message}</p>
}

export default AdminStatusBanner
