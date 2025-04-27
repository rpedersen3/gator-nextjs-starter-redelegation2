"use client";

import useDelegateSmartAccount from "@/hooks/useDelegateSmartAccount";
import useDelegatorSmartAccount from "@/hooks/useDelegatorSmartAccount";
import { useStepContext } from "@/hooks/useStepContext";
import useStorageClient from "@/hooks/useStorageClient";
import { prepareRootDelegation } from "@/utils/delegationUtils";

export default function CreateDelegationButton() {
  const { smartAccount } = useDelegatorSmartAccount();
  const { storeDelegation } = useStorageClient();
  const { smartAccount: delegateSmartAccount } = useDelegateSmartAccount();
  const { changeStep } = useStepContext();

  const handleCreateDelegation = async () => {
    if (!smartAccount || !delegateSmartAccount) return;
    console.log(smartAccount.address, delegateSmartAccount.address);


    const delegation = prepareRootDelegation(
      smartAccount,
      delegateSmartAccount.address
    );

    console.info("............................. sign delegation ..............................")
    const signature = await smartAccount.signDelegation({
      delegation,
    });
    console.info(".............. done")

    const signedDelegation = {
      ...delegation,
      signature,
    };


    console.log(signedDelegation);
    storeDelegation(signedDelegation);
    changeStep(6);
  };

  return (
    <button className="button" onClick={handleCreateDelegation}>
      Create Delegation
    </button>
  );
}
