/* FocuslyNow Service Worker — enables background push notifications */
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(clients.claim()); });
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  if (e.notification.data && e.notification.data.url) {
    e.waitUntil(clients.openWindow(e.notification.data.url));
  }
});
