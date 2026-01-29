import DownloadForm from '@/components/DownloadForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Instagram Reel Downloader
          </h1>
          <p className="text-gray-600 text-lg">
            Download Instagram reels quickly and easily
          </p>
        </div>

        <div className="flex justify-center">
          <DownloadForm />
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Paste an Instagram reel URL and click download</p>
          <p className="mt-2">Example: https://www.instagram.com/reel/ABC123/</p>
        </div>
      </div>
    </main>
  );
}
