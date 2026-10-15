import type { ReactNode } from 'react';
import { DEVICE_PROFILES, type DeviceProfileId } from '../types/system';

export function DeviceFrame({ profileId, fullscreen, children }: { profileId: DeviceProfileId; fullscreen: boolean; children: ReactNode }) {
  const profile = DEVICE_PROFILES[profileId];
  const ratio = profile.width / profile.height;
  const maxHeight = fullscreen ? '100dvh' : 'min(88dvh, 860px)';
  return <div className={fullscreen ? 'fullscreen-host' : 'device-bezel'} style={fullscreen ? undefined : { width: `min(38vw, ${profile.width + 20}px)`, height: `min(88dvh, ${profile.height + 20}px)` }}>
    <div className="device-screen" style={!fullscreen ? { aspectRatio: ratio, maxHeight } : undefined}>{children}</div>
  </div>;
}
