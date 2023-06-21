export class BaseRepository {
  constructor(model) {
    this.model = model
  }

  findById(id) {
    return this.model.findOne({ where: { id } })
  }
    
  findOne(search) {
    return this.model.findOne({ where: { ...search } })
  }
    
  findAndCount(search) {
    return this.model.findAndCountAll({ where: { ...search } })
  }

  deleteById(id) {
    return this.model.destroy({ where: { id } })
  }

  create(entity) {
    return this.model.create(entity)
  }
} 