import {Component, Input, OnInit} from '@angular/core';
import {FilesystemService} from '../../services/filesystem/filesystem.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ks-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  constructor(private filesystem: FilesystemService,
              private router: Router) {
  }

  ngOnInit() {
  }

}
