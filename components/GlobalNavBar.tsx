import NavClient from '@/components/NavClient';
import { fetchGlobalSettings, fetchNavigation } from '@/lib/strapi';

export default async function GlobalNavBar() {
  try {
    const [settings, navigation] = await Promise.all([
      fetchGlobalSettings(),
      fetchNavigation(),
    ]);
    return <NavClient logo={settings.logo} items={navigation.items} />;
  } catch {
    return <NavClient logo={null} items={[]} />;
  }
}
