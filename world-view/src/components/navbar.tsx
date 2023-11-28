interface NavBarProps {
  inputCountry: string
  handleSetInput: (arg: string) => void
}

export default function NavBar({ inputCountry, handleSetInput }: NavBarProps) {
  return (
    <nav>
      <input
        type="text"
        className="bg-[rgb(229,229,229)] rounded-2xl pl-2 py-1 m-1 border-2"
        value={inputCountry}
        placeholder="Rechercher"
        onChange={(v) => handleSetInput(v.currentTarget.value)}
      />
    </nav>
  )
}
