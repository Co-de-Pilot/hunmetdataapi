/*-------------------------------*/
/*APIFEATURES CLASS*/
/*-------------------------------*/
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObject = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObject[field]);
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt|regex|options)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort({ utcDataTime: -1 });
    }
    return this;
  }
  fieldLimit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }
  paginate() {
    const page = Number.parseInt(this.queryString.page) || 1;
    const limit = Number.parseInt(this.queryString.limit) || 300;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

/*-------------------------------*/
/*MODUL EXPORT*/
/*-------------------------------*/
export default APIFeatures;
