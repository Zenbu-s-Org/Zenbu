import { useState } from "react";
import Container from "@/components/ui/Container";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type ChangeDetailsFormProps = {
  userName: string;
  userEmail: string;
};

function ChangeDetailsForm({ userName, userEmail }: ChangeDetailsFormProps) {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState("");

  return (
    <Container variant="primary">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
          Change Details
        </h2>

        <div className="space-y-4 md:space-y-5">
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="E-mail"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="pt-2">
            <Button variant="primary" className="w-full md:text-base">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ChangeDetailsForm;
