/**
 * EnglishPath — Router
 * Guards pages that require login.
 * Call Router.guard() at top of every protected page.
 * Call Router.guestOnly() on login/register pages.
 */
const Router = (() => {

  // Redirect to login if not authenticated
  function guard() {
    if (!Auth.isLoggedIn()) {
      window.location.href = getBase() + 'pages/login.html';
      return false;
    }
    return true;
  }

  // Redirect to dashboard if already logged in
  function guestOnly() {
    if (Auth.isLoggedIn()) {
      window.location.href = getBase() + 'pages/dashboard.html';
      return false;
    }
    return true;
  }

  function go(path) {
    window.location.href = getBase() + path;
  }

  // Highlight active nav item in sidebar & bottom nav
  function setActiveNav(pageId) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === pageId);
    });
    document.querySelectorAll('.bottom-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === pageId);
    });
  }

  return { guard, guestOnly, go, setActiveNav };
})();

window.Router = Router;
