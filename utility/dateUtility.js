const moment              = require('moment');

exports.formats = {
  formatDate         : 'YYYY-MM-DD',
  formatTime         : 'HH:mm:ss',
  formatDateTime     : 'YYYY-MM-DD HH:mm:ss'
};

exports.getFormattedDate = (date, format) => {
  return moment(new Date(date)).format(format);
};
