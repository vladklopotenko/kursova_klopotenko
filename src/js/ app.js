import { refs } from './ui/refs';
import { createRouter } from './router';
import { api } from './api';
import { toast } from './ui/toast';

const router = createRouter({ mount: refs.app });

router.render();
bindGlobalNav();
bindSubscription();

function bindGlobalNav() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-route]');
    if (!btn) return;
    router.navigate({ route: btn.dataset.route, page: 1, view: 'categories', category: '', keyword: '' });
  });
}

function bindSubscription() {
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('#subscribeForm');
    if (!form) return;

    e.preventDefault();
    const email = String(new FormData(form).get('email') || '').trim();
    if (!email) {
      toast('Enter email', 'error');
      return;
    }

    try {
      await api.subscribe(email);
      toast('Subscribed successfully', 'success');
      form.reset();
    } catch (err) {
      toast(err.message || 'Subscribe error', 'error');
    }
  });
}
