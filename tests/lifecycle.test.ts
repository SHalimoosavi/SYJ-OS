import { describe, expect, it } from 'vitest';
import { useAppStore } from '../src/store/appStore';

describe('app lifecycle', () => { it('opens and closes one foreground app', () => { useAppStore.getState().open('calculator'); expect(useAppStore.getState().foreground).toBe('calculator'); useAppStore.getState().close(); expect(useAppStore.getState().foreground).toBeNull(); }); });
