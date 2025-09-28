import DashboardPage from '../../pages/DashboardPage';

// Mock API responses for the example
const originalApiClient = require('../../services/api').apiClient;

// TODO: Remove mock functionality when connecting to real API
const mockApiClient = {
  getCurrentUser: () => Promise.resolve({
    id: 'user-123',
    email: 'john.doe@example.com',
    role: 'admin',
    tenantSlug: 'acme-corp',
    plan: 'free',
  }),
  getNotes: () => Promise.resolve([
    {
      id: '1',
      title: 'Welcome to Notes App',
      content: 'This is your first note! You can create, edit, and delete notes to organize your thoughts.',
      userId: 'user-123',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      title: 'Project Ideas',
      content: '• Build a notes app\n• Create a todo list\n• Design a dashboard\n• Learn React patterns',
      userId: 'user-123',
      createdAt: '2024-01-15T11:00:00Z',
      updatedAt: '2024-01-15T11:00:00Z',
    },
    {
      id: '3',
      title: 'Meeting Notes',
      content: 'Discussed the new feature requirements and timeline. Next steps:\n1. Create wireframes\n2. Review with team\n3. Start development',
      userId: 'user-123',
      createdAt: '2024-01-15T14:00:00Z',
      updatedAt: '2024-01-15T14:00:00Z',
    },
  ]),
  createNote: (note: any) => Promise.resolve({
    id: 'new-' + Date.now(),
    ...note,
    userId: 'user-123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  updateNote: (id: string, note: any) => Promise.resolve({
    id,
    ...note,
    userId: 'user-123',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: new Date().toISOString(),
  }),
  deleteNote: (id: string) => Promise.resolve(),
  upgradeTenant: (slug: string) => Promise.resolve(),
};

// Replace the API client for this example
require('../../services/api').apiClient = mockApiClient;

export default function DashboardPageExample() {
  return (
    <div className="h-screen">
      <DashboardPage />
    </div>
  );
}