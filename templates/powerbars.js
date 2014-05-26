var Powerbar = window.Powerbar = function (url) {
  this.url = url;
};

Powerbar.prototype._request = function (path, state) {
  // For now just fire and mostly (we still log an error, should one occur)
  // forget an AJAX request.
  // Our backends accepts form-encoded POST data, `state=On` or `state=Off`.
  var request = new XMLHttpRequest();
  var data = 'state=' + encodeURIComponent(state);
  var url = this.url + path;

  console.log('Requesting: ' + url);

  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.open('POST', url, true);
  request.send(data);

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      // 4 means request success (as one would expect).
      console.log('Reply: ' + url + ' ' + request.status);
    }
  };
};

Powerbar.prototype.groupOn = function (group) {
  this._request('/group/' + group, 'On');
};

Powerbar.prototype.groupOff = function (group) {
  this._request('/group/' + group, 'Off');
};

Powerbar.prototype.socketOn = function (bar, socketNumber) {
  this._request('/' + bar + '/' + socketNumber, 'On');
};

Powerbar.prototype.socketOff = function (bar, socketNumber) {
  this._request('/' + bar + '/' + socketNumber, 'Off');
};
