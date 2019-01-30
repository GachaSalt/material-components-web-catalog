import React, {Component} from 'react';
import queryString from 'query-string';
import TextFieldOption from './options/TextFieldOption';
import RadioGroupOption from './options/RadioGroupOption';
import SelectOption from './options/SelectOption';
import FilterChipOption from './options/FilterChipOption';

export class HeroOptionsComponent extends Component {
  render() {
    if (!this.props.config) return null;
    return (
      <div className={`hero-options ${this.props.className}`}>
        <ul className='mdc-list mdc-list--non-interactive'>
          {this.props.config.options && this.props.config.options.map((option, index) => {
            return <Option key={option.name + index} option={option} {...this.props}/>
          })}
        </ul>
      </div>
    );
  }
}

const Option = (props) => {
  return getOptionComponent(props.option, props);
};

const getOptionComponent = (option, props) => {
  switch(option.type) {
    case 'label':
      return <li className='mdc-list-item'><LabelOption>{option.name}</LabelOption></li>;
    case 'filterchips':
      return <FilterChipOption {...option} {...props}/>;
    case 'radiogroup':
      return <RadioGroupOption {...option} {...props}/>;
    case 'select':
      return <SelectOption {...option} {...props}/>;
    default: // Text field
      return <TextFieldOption {...option} {...props}/>;
  }
};

export const updateUrl = (history, key, newValue, search) => {
  const urlParams = queryString.parse(search);

  urlParams[key] = newValue;
  history.push({
    pathname: history.location.pathname,
    search: queryString.stringify(urlParams),
  });
};

const LabelOption = ({children}) => {
  return (
      <span className='mdc-typography--subtitle2'>{children}</span>
  )
};
