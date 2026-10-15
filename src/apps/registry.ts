import { Calculator, Camera, Clock3, FileText, Folder, Globe, Image, MessageSquare, Phone, Settings, ShoppingBag, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AppId = 'settings' | 'calculator' | 'phone' | 'messages' | 'browser' | 'camera' | 'gallery' | 'files' | 'clock' | 'contacts' | 'notes' | 'store';

export interface AppDefinition { id: AppId; name: string; icon: LucideIcon; accent: string; }

export const apps: AppDefinition[] = [
  { id: 'settings', name: 'Settings', icon: Settings, accent: '#27E38A' },
  { id: 'calculator', name: 'Calculator', icon: Calculator, accent: '#41d9ff' },
  { id: 'phone', name: 'Phone', icon: Phone, accent: '#27E38A' },
  { id: 'messages', name: 'Messages', icon: MessageSquare, accent: '#41d9ff' },
  { id: 'browser', name: 'Browser', icon: Globe, accent: '#8fb8ff' },
  { id: 'camera', name: 'Camera', icon: Camera, accent: '#d9d9df' },
  { id: 'gallery', name: 'Gallery', icon: Image, accent: '#c995ff' },
  { id: 'files', name: 'Files', icon: Folder, accent: '#ffc45c' },
  { id: 'clock', name: 'Clock', icon: Clock3, accent: '#ff8e8e' },
  { id: 'contacts', name: 'Contacts', icon: UserRound, accent: '#8de0ff' },
  { id: 'notes', name: 'Notes', icon: FileText, accent: '#ffe082' },
  { id: 'store', name: 'SYJ Store', icon: ShoppingBag, accent: '#27E38A' }
];

export const homeAppIds: AppId[] = ['phone', 'messages', 'browser', 'camera', 'gallery', 'files', 'clock', 'contacts', 'notes', 'settings', 'calculator', 'store'];
