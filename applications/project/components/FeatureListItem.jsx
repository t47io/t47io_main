import React  from 'react';


const FeatureListItem = ({
  text,
  link,
}) => {
  if (!link.length) {
    return (
      <li>{text}</li>
    );
  }

  return (
    <li>
      <a
        href={link}
        target="_blank" rel="noopener noreferrer external"
      >
        {text}
      </a>
    </li>
  );
};

FeatureListItem.propTypes = {
  text: React.PropTypes.string,
  link: React.PropTypes.string,
};
FeatureListItem.defaultProps = {
  text: '',
  link: '',
};


export default FeatureListItem;
