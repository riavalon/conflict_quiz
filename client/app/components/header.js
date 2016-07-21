import React, {Component} from 'react';


export class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.capitalizeHeader = this.capitalizeHeader.bind(this);
  }

  capitalizeHeader(str) {
    let capstr;

    if (str.indexOf('/') > -1) {
      capstr = str.split('/').map((s, idx) => {
        return s.charAt(0).toUpperCase() + s.substring(1);
      }).join(' ');
    } else {
      capstr = str.charAt(0).toUpperCase() + str.substring(1);
    }

    return capstr;
  }

  render() {
    const strongest = this.capitalizeHeader(this.props.strongest);
    const filename = this.props.strongest.replace('/', '_');
    return (
      <div>
        <div class="row mb2">
          <div class="col-sm-10 col-sm-offset-1">
            <h2 class="text-center">Your Results</h2>
          </div>
        </div>

		<hr />

        <div class="row my2">
          <div class="col-sm-10 col-sm-offset-1">
            <h1 class="strongest-type text-center caps">{strongest}</h1>
          </div>
        </div>

		<hr />
      </div>
    );
  }
};



