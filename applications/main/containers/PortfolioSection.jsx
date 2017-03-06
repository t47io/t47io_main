import React from 'react';
import { SparkProxy } from '../../common/js/factory.js';

import SectionHeader from '../../common/components/SectionHeader.jsx';
import PortfolioFilterItem from '../components/PortfolioFilterItem.jsx';
import PortfolioItem from '../components/PortfolioItem.jsx';

import { portfolio as tween } from '../js/tweens.js';
import '../stylesheets/PortfolioSection.scss';


class PortfolioSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      filter: 'all',
    };

    this.onFilter = this.onFilter.bind(this);
  }

  onFilter(e) {
    e.preventDefault();
    const filter = e.target.dataset.filter;
    const items = (filter === 'all') ? this.props.items :
      this.props.items.filter(item => (item.category === filter));
    this.setState({
      items,
      filter,
    });
  }

  render() {
    const { category } = this.props;
    const { filter, items } = this.state;

    return (
      <section id="PORTFOLIO__section">
        <div className="PORTFOLIO__trigger">
          <div
            className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
            style={{ padding: '0' }}
          >
            <SectionHeader
              title="my works" subtitle="what I am proud of"
              proxyId="PORTFOLIO__header"
              tween={tween.header}
            />

            <p className="text-gray text-center">
              <span className="fa-stack">
                <i className="fa fa-fw fa-blank fa-stack-2x text-light-green" />
                <i className="fa fa-fw fa-mouse-pointer fa-stack-1x text-white" />
              </span>
              Click for more details about each <span className="text-green">project</span>.
            </p>

            <div className="PORTFOLIO__area" >
              <div className="PORTFOLIO__menu">
                <SparkProxy.ul proxyId="PORTFOLIO__menu">
                  {category.map((name, i) => (
                    <PortfolioFilterItem
                      name={name} index={i}
                      filter={filter}
                      onClick={this.onFilter}
                    />
                  ))}
                </SparkProxy.ul>
              </div>

              <div className="PORTFOLIO__content">
                <div className="PORTFOLIO__div">
                  {items.map((item, i) => (
                    <PortfolioItem {...item} index={i} key={item.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

PortfolioSection.propTypes = {
  category: React.PropTypes.array.isRequired,
  items: React.PropTypes.array.isRequired,
};


export default PortfolioSection;
