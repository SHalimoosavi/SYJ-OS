import type { WallpaperId } from '../types/system';

export const wallpapers: Record<WallpaperId, string> = {
  dynamic: 'radial-gradient(circle at 20% 20%, rgba(39,227,138,.34), transparent 32%), radial-gradient(circle at 80% 70%, rgba(41,214,255,.24), transparent 35%), #0b0f14',
  aurora: 'linear-gradient(135deg, #07130f 0%, #0f3b2d 46%, #0c1420 100%)',
  graphite: 'linear-gradient(145deg, #090c10, #202731 55%, #0c1117)',
  mint: 'linear-gradient(145deg, #0c1b17, #164d3b 50%, #0b1714)',
  circuit: 'linear-gradient(135deg, #081018, #12303a 45%, #0b1119)',
  dawn: 'linear-gradient(145deg, #241714, #6b4534 48%, #15202a)',
  ocean: 'linear-gradient(145deg, #07111d, #123e62 50%, #07131f)',
  violet: 'linear-gradient(145deg, #100d19, #3c2857 52%, #11111e)',
  sand: 'linear-gradient(145deg, #1b1711, #594d39 48%, #15130f)'
};

export const wallpaperNames: Record<WallpaperId, string> = {
  dynamic: 'Dynamic', aurora: 'Aurora', graphite: 'Graphite', mint: 'Mint', circuit: 'Circuit', dawn: 'Dawn', ocean: 'Ocean', violet: 'Violet', sand: 'Sand'
};
