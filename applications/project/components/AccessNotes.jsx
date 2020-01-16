import React from 'react';

import cssType from '../stylesheets/typography.scss';
import cssAccess from '../stylesheets/AccessSection.scss';


const DaslabServerNote = () => (
  <p styleName="cssAccess.PROJECT__access-note">
    Internal Site
    <span styleName="cssType.PROJECT__label cssType.PROJECT__label--red" className="label">not</span>
    accessible to <u>public</u>
    (<span styleName="cssType.PROJECT__label cssType.PROJECT__label--blue" className="label">WebAuth</span> gated).
  </p>
);

const DaslabDemoNote = () => (
  <p styleName="cssAccess.PROJECT__access-note">
    Internal Site with
    <span styleName="cssType.PROJECT__label cssType.PROJECT__label--green" className="label">mock-up</span>
    data for <u>public</u> view.
  </p>
);

const EternaServerNote = () => (
  <p styleName="cssAccess.PROJECT__access-note">
    Brower page
    <span styleName="cssType.PROJECT__label cssType.PROJECT__label--red" className="label">only</span>
    accessible to <u>community</u>
    (requires <span styleName="cssType.PROJECT__label cssType.PROJECT__label--blue" className="label">login</span>).
  </p>
);

const EternaDemoNote = () => (
  <p styleName="cssAccess.PROJECT__access-note">
    Prototype with
    <span styleName="cssType.PROJECT__label cssType.PROJECT__label--green" className="label">static</span>
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
