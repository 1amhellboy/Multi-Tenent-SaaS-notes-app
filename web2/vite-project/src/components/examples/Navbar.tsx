import Navbar from '../Navbar';

export default function NavbarExample() {
  const mockUser = {
    id: 'user-123',
    email: 'john.doe@example.com',
    role: 'admin' as const,
    tenantSlug: 'acme-corp',
  };

  return <Navbar user={mockUser} />;
}