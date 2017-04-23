import React from 'react';


const DaslabServerNote = () => (
  <p className="PROJECT__access-note">
    Internal Site
    <span className="label PROJECT__label--red">not</span>
    accessible to <u>public</u>
    (<span className="label PROJECT__label--blue">WebAuth</span> gated).
  </p>
);

const DaslabDemoNote = () => (
  <p className="PROJECT__access-note">
    Internal Site with
    <span className="label PROJECT__label--green">mock-up</span>
    data for <u>public</u> view.
  </p>
);

const EternaServerNote = () => (
  <p className="PROJECT__access-note">
    Brower page
    <span className="label PROJECT__label--red">only</span>
    accessible to <u>community</u>
    (requires <span className="label PROJECT__label--blue">login</span>).
  </p>
);

const EternaDemoNote = () => (
  <p className="PROJECT__access-note">
    Prototype with
    <span className="label PROJECT__label--green">static</span>
    data for <u>public</u> view.
  </p>
);


export const daslabNotes = {
  prod: (<DaslabServerNote />),
  demo: (<DaslabDemoNote />),
};

export const eternaNotes = {
  prod: (<EternaServerNote />),
  demo: (<EternaDemoNote />),
};
