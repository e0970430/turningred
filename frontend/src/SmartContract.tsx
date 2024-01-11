import { IPortkeyProvider, MethodsBase } from "@portkey/provider-types";
import useSmartContract from "./useSmartContract";
import { useState } from "react";

function Pie({
  number,
  color,
  display,
}: {
  number: number;
  color: string;
  display: number;
}) {
  return (
    <svg height="200" width="200" viewBox="0 0 20 20">
      <circle r="10" cx="10" cy="10" fill="transparent" />
      <circle
        r="5"
        cx="10"
        cy="10"
        fill="transparent"
        stroke={color}
        stroke-width="10"
        stroke-dasharray={`calc(${number} * 31.4 / 100) 31.4`}
        transform="rotate(-90) translate(-20)"
      />
      <text
        x="10"
        y="15"
        style={{
          fill: "white",
          fontSize: "3px",
        }}
      >
        {display}
      </text>
    </svg>
  );
}

interface ICharacter {
  health: number;
  strength: number;
  speed: number;
}

function SmartContract({ provider }: { provider: IPortkeyProvider | null }) {
  const characterContract = useSmartContract(provider);
  const [result, setResult] = useState<ICharacter>();
  const [initialized, setInitialized] = useState(false);

  const onClick = async () => {
    try {
      const accounts = await provider?.request({
        method: MethodsBase.ACCOUNTS,
      });
      if (!accounts) throw new Error("No accounts");

      const account = accounts?.tDVW?.[0]!;
      if (!account) throw new Error("No account");

      // 1. if not initialized, it will be initialized
      if (!initialized) {
        await characterContract?.callSendMethod("Initialize", account, {});
        setInitialized(true);
      }

      // 2. if a character has not been created yet, it will create a character
      await characterContract?.callSendMethod("CreateCharacter", account, {});

      // 3. get character
      const result = await characterContract?.callViewMethod<ICharacter>(
        "GetMyCharacter",
        account
      );

      setResult(result?.data);
    } catch (error) {
      console.error(error, "====error");
    }
  };

  if (!provider) return null;

  return (
    <div>
      <button onClick={onClick}>Get Character</button>
      <div style={{ display: "flex" }}>
        <div>
          Health:
          <br />
          <Pie
            number={result?.health ?? 0}
            color="tomato"
            display={result?.health ?? 0}
          />
        </div>
        <div>
          Strength:
          <br />
          <Pie
            number={result?.strength ?? 0}
            color="green"
            display={result?.strength ?? 0}
          />
        </div>
        <div>
          Speed:
          <br />
          <Pie
            number={(result?.speed ?? 0) / 2.0}
            color="blue"
            display={result?.speed ?? 0}
          />
        </div>
      </div>
    </div>
  );
}

export default SmartContract;