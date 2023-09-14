import { FunctionComponent } from "react"
import Information from "@/components/screens/information/Information"
import Tab from "@/components/screens/profile/components/userInfo/Tab"

interface ContactsProps {}

const ContactsPage: FunctionComponent<ContactsProps> = () => {
  return (
    <Information>
      <Tab />
    </Information>
  )
}

export default ContactsPage
