/**
 * SpotifyWidget Component
 * 
 * Displays Spotify playlist embed using iframe.
 */
export function SpotifyWidget() {
  return (
    <section
      className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800"
      role="complementary"
      aria-label="Spotify Playlist"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <iframe
            title="Spotify Embed: Recommendation Playlist"
            src="https://open.spotify.com/embed/playlist/4TWFgXTc7d7fpeCNdTU2Zl?utm_source=generator&theme=0"
            width="100%"
            height="360"
            style={{ borderRadius: '12px' }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
