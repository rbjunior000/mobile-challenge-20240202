import { icons, LucideProps } from 'lucide-react-native'

type IconProps = {
  name: keyof typeof icons
  color?: LucideProps['color']
  size?: LucideProps['size']
}

export const Icon = ({ name, color, size }: IconProps) => {
  const LucideIcon = icons[name]
  return <LucideIcon color={color} size={size} />
}
