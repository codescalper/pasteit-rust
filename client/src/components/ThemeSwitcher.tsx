import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected={theme === 'dark'} 
      size="sm"
      color="secondary"
      onChange={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
    </Switch>
  );
}
