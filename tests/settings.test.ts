import { describe, expect, it, beforeEach } from 'vitest';
import { useSystemStore } from '../src/store/systemStore';
import { DEFAULT_HARDWARE, DEFAULT_SECURITY, DEFAULT_SETTINGS } from '../src/types/system';

describe('settings persistence model', () => { beforeEach(() => useSystemStore.setState({ hardware: { ...DEFAULT_HARDWARE }, security: { ...DEFAULT_SECURITY }, settings: { ...DEFAULT_SETTINGS }, layout: [], homePage: 0, booted: false, locked: true, poweredOff: false })); it('updates and resets settings', () => { useSystemStore.getState().setSettings({ theme: 'dark', fontScale: 1.15 }); expect(useSystemStore.getState().settings.theme).toBe('dark'); useSystemStore.getState().factoryReset(); expect(useSystemStore.getState().settings).toEqual(DEFAULT_SETTINGS); }); });
