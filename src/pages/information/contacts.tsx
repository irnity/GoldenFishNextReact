import { FunctionComponent } from "react"
import Information from "@/features/information/Information"
import Tab from "@/features/profile/components/userInfo/Tab"

interface ContactsProps {}

const ContactsPage: FunctionComponent<ContactsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ContactsPage
