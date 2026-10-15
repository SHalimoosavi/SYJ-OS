import { effectiveNetwork } from '../core/hardware';

export function networkLabel(): string {
  return effectiveNetwork();
}

export function networkIcon(): 'wifi' | '5g' | 'offline' {
  const label = networkLabel();
  return label === 'Wi-Fi' ? 'wifi' : label === '5G' ? '5g' : 'offline';
}
