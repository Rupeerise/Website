export const handleUnauthorized = () => {
  const currentUrl = window.location.href;
  window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
};
