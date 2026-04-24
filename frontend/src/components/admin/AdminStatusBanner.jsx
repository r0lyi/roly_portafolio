function AdminStatusBanner({ type = 'info', message }) {
  if (!message) {
    return null
  }

  return <p className={`admin-status admin-status-${type}`}>{message}</p>
}

export default AdminStatusBanner
