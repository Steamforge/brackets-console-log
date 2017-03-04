/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
  'use strict';

  var DocumentManager = brackets.getModule('document/DocumentManager');
  var EditorManager = brackets.getModule('editor/EditorManager');

  var CommandManager = brackets.getModule('command/CommandManager');
  var Menus = brackets.getModule('command/Menus');

  var addSomeText = function() {
  var currentDoc = DocumentManager.getCurrentDocument();
    var editor = EditorManager.getCurrentFullEditor();
    var pos = editor.getCursorPos();
    var line = currentDoc.getLine(pos.line);
    var selectedText  = editor.getSelectedText();
    var doc = editor._codeMirror;

    if(selectedText === '') {
      editor.selectWordAt(pos);
      selectedText  = editor.getSelectedText();
    }
    var newPos = {line: pos.line, ch: line.length + 1};

    currentDoc.replaceRange('\nconsole.log(\''+selectedText+'\', '+selectedText+');', newPos);
    doc.indentLine(newPos.line + 1, 'smart');
  };

  var MY_COMMAND_ID = 'consolelog.allthethings';
  CommandManager.register('Console Log', MY_COMMAND_ID, addSomeText);

  var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
  menu.addMenuItem(MY_COMMAND_ID, 'Ctrl-Alt-Q');

  var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
  contextMenu.addMenuItem(MY_COMMAND_ID);
});

var test = '';
