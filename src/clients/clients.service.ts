import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const cli = this.clientRepository.create(createClientDto);
    const data = [cli.nombre, cli.apellido, cli.phone];
    const client = this.clientRepository.query(
      'CALL sp_create_clients(?,?,?)',
      data,
    );
    return client;
  }

  findAll() {
    return this.clientRepository.query('CALL sp_get_clients()');
  }

  findOne(id: number) {
    const res = this.clientRepository.query('CALL sp_get_one_cli(?)', [id]);
    return res;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    const resClient = this.clientRepository.update(id, updateClientDto);
    return resClient;
  }
  remove(id: number) {
    const res = this.clientRepository.query('CALL sp_delete_cli(?)', [id]);
    return res;
  }
}
