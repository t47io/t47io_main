import React from 'react';


const DaslabServerNote = () => (
  <p>
    Internal Site
    <span className="label PROJECT__label--red">not</span>
    accessible to <u>public</u>
    (<span className="label PROJECT__label--blue">WebAuth</span> gated).
  </p>
);

const DaslabDemoNote = () => (
  <p>
    Internal Site with
    <span className="label PROJECT__label--green">mock-up</span>
    data for <u>public</u> view.
  </p>
);

const EternaServerNote = () => (
  <p>
    Brower page
    <span className="label PROJECT__label--red">only</span>
    accessible to <u>community</u>
    (requires <span className="label PROJECT__label--blue">login</span>).
  </p>
);

const EternaDemoNote = () => (
  <p>
    Prototype with
    <span className="label PROJECT__label--green">static</span>
    data for <u>public</u> view.
  </p>
);


export const daslabNotes = {
  server: (<DaslabServerNote />),
  demo: (<DaslabDemoNote />),
};

export const eternaNotes = {
  server: (<EternaServerNote />),
  demo: (<EternaDemoNote />),
};
