import React from "react";
import DualButtonPopupModal from "../../Components/PopupModals/DualButtonPopupModal/DualButtonPopupModal";
import DualButtonPopupModalWithTextfields from "../../Components/PopupModals/DualButtonPopupModalWithTextfields/DualButtonPopupModalWithTextfields";

function PlayGroundPopupModals() {
  return (
    <div style={{ display: "flex" }}>
      <DualButtonPopupModal
        subject="Unsaved changes"
        description="Do you want to save or discard changes?"
        esc="Discard"
        save="Save changes"
      />
      <br />
      <br />
      <DualButtonPopupModalWithTextfields
        title="Create new organization"
        esc="Cancel"
        save="Save"
      />
    </div>
  );
}

export default PlayGroundPopupModals;
